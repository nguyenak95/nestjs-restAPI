## Mục tiêu của bài test
1. JSON web token (jwt) và áp dụng jwt cho thao tác liên quan đến chứng thực (authentication) người dùng cho ứng dụng sử dụng RESTful API.
2. Nắm được cách sử dụng controller của framework NESTJS.
3. Nắm được các http status code phổ biến dải từ 2xx, 3xx, 4xx.
4. Các phương thức phổ biến POST, GET và truyền tham số theo url
## Yêu cầu
### Case 1
1. Ứng dụng có thể chạy được trên port được cấu hình trong file .env
### Case 2
1. Người dùng có thể đăng ký tài khoản khi thực hiện phương thức **POST** đến route **auth/register** với nội dung json sau
```json
{
  "name": string,
  "password": string,
  "username": string
}
```
2. Nếu đăng ký thành công trả về status code 204 thay vì 201
3. Hai người dùng không được có cùng **username**, nếu đăng ký tài khoản với **username** đã tồn tại trả về status code 409
4. Để nhằm phục vụ mục đích test thì cần thêm route **GET /user/username** trả về tất cả thông tin của user theo username theo mẫu sau:
```json
{
  "name": string,
  "username": string,
  "password": string,
  "_id": string
}
```
5. Mật khẩu được hash
### Case 3
1. Người dùng có thể đăng nhập sử dụng route **/auth/login** với body bên dưới.
```json
{
  "username": string,
  "password": string
}
```
2. Đăng nhập thành công sẽ nhận được json response có thuộc tính token, token được hash với object như bên dưới.
```json
// Response
{
  "token": string
}
```

```json
// Hash body
{
  "userID": string
}
```
3. Route **/product/public** có thể truy cập mà không cần token, sau đó trả về chuỗi *public content*
4. Route **/product/protected** không thể truy cập nếu không có token
5. Route **/product/protected** có thể truy cập thông qua token gửi kèm trong header Authorization, với định dạng bên dưới, nội dung trả về là *private content of ${userID}*, với userID là ID được hash khi trả về token ở bước 2.
```
Authorization: "Bearer token"
```
6. Người dùng không thể thực hiện bước 5 nếu sử dụng token không hợp lệ.

<p align="center">
  <img src="./at/demo1.png" width="100%" alt="success example">
</p>