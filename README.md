# Qeydiyyat və Rezervasiya Sistemi API

Bu layihə, istifadəçilərin qeydiyyatdan keçməsi, məkanlarda rezervasiya etməsi və rezervasiyalarını idarə etməsinə imkan tanıyan RESTful API təqdim edir. API, Node.js və Express.js istifadə edilərək hazırlanmışdır və MongoDB verilənlər bazası ilə işləyir. Eyni zamanda, Redis keşləmə texnologiyası, Swagger API dokumentasiyası və Jest ilə testlər də əlavə edilmişdir.

## Texnologiyalar

- **Backend:** Node.js, Express.js
- **Verilənlər Bazası:** MongoDB (Mongoose ilə)
- **Keşləmə:** Redis
- **Autentifikasiya:** JSON Web Tokens (JWT)
- **Məlumat Doğrulaması:** Joi 
- **Testlər:** Jest
- **API Dokumentasiyası:** Swagger
- **Docker İnteqrasiyası:** Docker Compose
- **Deployment:** Netlify

## Funksional Xüsusiyyətlər

### 1. İstifadəçi Autentifikasiyası və Avtorizasiyası

- **Qeydiyyat:** `POST /api/auth/register` - username, email, password. Şifrə bcrypt ilə hash ediləcək.
- **Giriş:** `POST /api/auth/login` - email, password. Düzgün giriş zamanı JWT token qaytarılır.
- **Autentifikasiya Olunan Sorğular:** JWT token Authorization header-ında Bearer formatında göndərilməlidir.

### 2. Məkanların İdarə Edilməsi (CRUD)

- **Məkan Yaratma:** `POST /api/venues` - name, location, capacity, description. Yalnız adminlər üçün.
- **Məkanları Görüntüləmə:** `GET /api/venues` - Pagination və filtrləmə ilə.
- **Məkan Detallarını Görüntüləmə:** `GET /api/venues/:id`
- **Məkan Yeniləmə:** `PUT /api/venues/:id` - Yalnız adminlər üçün.
- **Məkan Silmə:** `DELETE /api/venues/:id` - Yalnız adminlər üçün.

### 3. Rezervasiya Sistemi

- **Rezervasiya Yaratma:** `POST /api/reservations` - venueId, date, time, numberOfPeople. Məkanın mövcudluğu yoxlanılır.
- **İstifadəçinin Rezervasiyalarını Görüntüləmə:** `GET /api/reservations`
- **Rezervasiya Detallarını Görüntüləmə:** `GET /api/reservations/:id`
- **Rezervasiyanı Ləğv Etmə:** `DELETE /api/reservations/:id`

### 4. Məlumat Doğrulaması və Səhv İdarəetməsi

- **Məlumat Doğrulaması:** email və password formatları yoxlanılır.
- **Səhv İdarəetməsi:** 401 Unauthorized, 403 Forbidden, 400 Bad Request, 404 Not Found.

### 5. Əlavə Funksional Xüsusiyyətlər

- **Role-Based Access Control (RBAC):** İstifadəçilərin rolları (user, admin) tətbiq olunur.
- **Caching (Keşləmə):** Redis ilə keşləmə tətbiq edilir.
- **API Dokumentasiyası:** Swagger ilə API sənədləşdirilmişdir.

### 6. Test Yazılması

- ** Testləri:** Jest ilə testlər yazılmışdır.

## Quraşdırma

1. **Klonlamaq:** `git clone https://github.com/XayalXudiyev/Reservation-system`
2. **Asılılıqları Yükləmək:** `npm install`
3. **Ətraf Mühit Dəyişənləri:** `.env` faylını yaradın və müvafiq dəyişənləri əlavə edin.
4. **Serveri İşə Salmaq:** `npm start`

## Testlər

- Testləri işə salmaq üçün: `npm test`

## Deployment

- **Netlify:** Layihə https://reservation-system.up.railway.app/api-docs/

## API Dokumentasiyası

- **Swagger:** API sənədləri Swagger vasitəsilə təqdim edilir. [Swagger Dokumentasiyası](<swagger-url>)

## Docker İnteqrasiyası

- **Dockerfile və docker-compose.yml faylları mövcuddur.** Docker konteynerində işlətmək üçün `docker-compose up` əmri istifadə edilə bilər.

## Əlavə Bonus Tapşırıqlar

- **Email Bildirişləri:** Rezervasiya təsdiqləndikdə istifadəçiyə email göndərilir.

