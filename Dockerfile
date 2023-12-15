# Etapa 1: Construir a aplicação Angular
FROM node:16-alpine as build-step

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Altere o comando de build para usar a configuração de produção
RUN npm run build -- --configuration production

# Etapa 2: Configurar o servidor Nginx para servir a aplicação
FROM nginx:1.21-alpine

# Copiar os arquivos de build do Angular para o diretório do servidor
COPY --from=build-step /app/dist/app-portal-mais-saude /usr/share/nginx/html

# Copiar o arquivo de configuração do NGINX personalizado
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

