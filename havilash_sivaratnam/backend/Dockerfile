FROM bitnami/laravel as development

WORKDIR /app
COPY . .
RUN composer install

EXPOSE 8000
CMD php artisan migrate --force --seed && php artisan serve --port=8000 --host=0.0.0.0
