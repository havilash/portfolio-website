FROM bitnami/laravel as development

WORKDIR /app
COPY . .
RUN composer install

EXPOSE 8000
CMD if php artisan migrate:status | grep -q 'No'; then php artisan migrate:fresh --seed; fi && \
    php artisan serve --port=8000 --host=0.0.0.0
