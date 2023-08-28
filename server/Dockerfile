# FROM composer:2.0 as vendor

# WORKDIR /var/www/html
# COPY composer.json /html

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

FROM alpine:3.18

WORKDIR /var/www/html

# add secret file .env
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cp /etc/secrets/.env /var/www/html/.env

# Install packages and remove default server definition
RUN apk add \
	curl \
	nginx \
	supervisor \
	composer
RUN apk --repository https://dl-cdn.alpinelinux.org/alpine/edge/main add  \
	icu-libs \
	&& apk --repository https://dl-cdn.alpinelinux.org/alpine/edge/community add \
	php82 \
	php82-ctype \
	php82-curl \
	php82-dom \
	php82-fpm \
	php82-gd \
	php82-intl \
	php82-mbstring \
	php82-mysqli \
	php82-pdo_mysql \
	php82-opcache \
	php82-openssl \
	php82-phar \
	php82-session \
	php82-xml \
	php82-xmlreader  \
	&& ln -sf /usr/bin/php82 /usr/bin/php

RUN apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ \
	openssh \
	&& curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer --version=2.5.1

COPY composer.json /var/www/html
RUN  php /usr/bin/composer install

# Configure nginx - http
COPY ./docker/web/nginx.conf /etc/nginx/nginx.conf
# Configure nginx - default server
COPY ./docker/web/conf.d /etc/nginx/conf.d/

# Configure PHP-FPM
COPY ./docker/web/fpm-pool.conf /etc/php82/php-fpm.d/www.conf

# Configure supervisord
COPY ./docker/web/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Make sure files/folders needed by the processes are accessable when they run under the nobody user
RUN chown -R nobody.nobody /var/www/html /run /var/lib/nginx /var/log/nginx

# # Create symlink for php
# RUN ln -s /usr/bin/php82 /usr/bin/php

# Switch to use a non-root user from here on
USER nobody

# Add application
COPY --chown=nobody . /var/www/html/

# Expose the port nginx is reachable on
EXPOSE 8080

# Let supervisord start nginx & php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]