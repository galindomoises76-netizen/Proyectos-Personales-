# Sube el proyecto a consultora-transicion-tecnologica- con archivos en la RAIZ
# Este script copia el contenido a una carpeta temporal, crea un repo nuevo y hace push.
# Asi se garantiza que nextjs-app, backend, frontend queden en la raiz (sin carpeta "Consultora...").

$ErrorActionPreference = "Stop"
$carpetaOrigen = $PSScriptRoot
$carpetaTemp = Join-Path (Split-Path $carpetaOrigen -Parent) ("consultora-github-raiz-" + (Get-Date -Format "yyyyMMddHHmmss"))
$repoUrl = "https://github.com/galindomoises76-netizen/consultora-transicion-tecnologica-.git"

Write-Host "=== Subir a consultora-transicion-tecnologica- (archivos en raiz) ===" -ForegroundColor Yellow
Write-Host ""

# 1. Crear carpeta temporal y copiar contenido (excluyendo .git, node_modules, .next)
New-Item -ItemType Directory -Path $carpetaTemp -Force | Out-Null
Write-Host "Copiando archivos (sin node_modules ni .next) a carpeta temporal..." -ForegroundColor Cyan
robocopy $carpetaOrigen $carpetaTemp /E /XD .git node_modules .next /NFL /NDL /NJH /NJS | Out-Null
if ($LASTEXITCODE -gt 7) { exit 1 }

# 2. En la carpeta temporal: init, add, commit, push
Set-Location $carpetaTemp

Write-Host "Inicializando repositorio Git en la carpeta temporal..." -ForegroundColor Cyan
git init
git remote add origin $repoUrl
git branch -M main

Write-Host "Agregando todos los archivos..." -ForegroundColor Cyan
git add .

Write-Host "Creando commit..." -ForegroundColor Cyan
git commit -m "Project at repository root - AI Consultancy (nextjs-app, backend, frontend)"

Write-Host "Subiendo a GitHub (reemplaza la estructura anterior)..." -ForegroundColor Cyan
git push -u origin main --force

Set-Location $carpetaOrigen

Write-Host ""
Write-Host "=== Listo ===" -ForegroundColor Green
Write-Host "Abre: https://github.com/galindomoises76-netizen/consultora-transicion-tecnologica-" -ForegroundColor Green
Write-Host "Veras nextjs-app, backend, frontend en la RAIZ (sin carpeta Consultora...)." -ForegroundColor Green
Write-Host ""
Write-Host "Puedes borrar la carpeta temporal si quieres: $carpetaTemp" -ForegroundColor Gray
