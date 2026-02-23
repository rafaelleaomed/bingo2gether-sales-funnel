from playwright.sync_api import sync_playwright
import time

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 390, 'height': 844}) # Mobile viewport
        page = context.new_page()
        
        print("Iniciando testes no Funil do Bingo2Gether...")
        
        try:
            # 1. Página Inicial
            print("1. Acessando Home...")
            page.goto('http://localhost:3000')
            page.wait_for_load_state('networkidle')
            print(f"URL atual: {page.url}")
            
            # Encontrar botões de Meta
            goals = page.locator('button').all_text_contents()
            print(f"Botões encontrados na Home (Metas): {goals}")
            
            # Clicar no primeiro botão disponível (ex: Viagem, Casada, Casa)
            # Como a aplicação pode esperar um clique em um elemento específico, vamos pegar o primeiro button.
            if len(goals) > 0:
                print(f"Clicando na meta: {goals[0].strip()}")
                page.locator('button').first.click()
            else:
                # Caso o botão seja uma div clicável
                print("Nenhum botão literal encontrado. Tentando clicar no primeiro card.")
                page.mouse.click(200, 300)
            
            # Aguardar carregamento da próxima tela
            page.wait_for_timeout(2000)
            page.wait_for_load_state('networkidle')
            print(f"URL após seleção de meta: {page.url}")
            
            # Tirar print de debug
            page.screenshot(path='debug_funnel_1.png')
            
            print("Teste básico de navegação executado sem crash.")

        except Exception as e:
            print(f"Erro durante a navegação: {e}")
            
        finally:
            browser.close()

if __name__ == "__main__":
    run_test()
