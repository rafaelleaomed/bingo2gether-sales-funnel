import { NextRequest, NextResponse } from 'next/server';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = '181195512831018495'; // Funil Bingo2Gether

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
        }

        if (!MAILERLITE_API_KEY) {
            console.error('MAILERLITE_API_KEY não configurada');
            return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
        }

        // Adicionar subscriber ao MailerLite com grupo
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email,
                groups: [MAILERLITE_GROUP_ID],
                fields: {
                    source: 'funnel_sales_page',
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('MailerLite error:', data);
            return NextResponse.json(
                { error: data.message || 'Erro ao cadastrar' },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Cadastrado com sucesso!',
        });
    } catch (error) {
        console.error('Subscribe API error:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
