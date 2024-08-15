# UIT-DKHP-Check-Slot-Alert

Một tool auto check xem một course nào đó trên UIT DKHP có được nhả chưa, nếu có => Gửi thông báo đến telegram

## Usage

```
touch .env
```

Điền các thông tin sau:

```
UIT_PROFILE_TOKEN=YOUR_UIT_PROFILE_TOKEN

TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID
```

- UIT_PROFILE_TOKEN: Đăng nhập vào web chính chủ uit dkhp, mở dev tool -> Tab network -> Header -> Request header -> Authorization, đó là token, copy cả phần "Bearer ...." vào đây

- TELEGRAM_BOT_TOKEN: Tạo một con bot telegram: https://sendpulse.com/knowledge-base/chatbot/telegram/create-telegram-chatbot, và paste token của bot vào đây

- TELEGRAM_CHAT_ID: Dùng con bot này để lấy ID tele mà muốn nhận tin nhắn: https://t.me/id_users_bot

Sau đó, vào file course-check-list.json và config:

```
{
  "courses": ["SE100.P12", "SE100.P13"],
  "delay": {
    "from": 2,
    "to": 5
  },
  "print_course_detail": false
}
```

- courses: list các mã lớp muốn check
- delay: from - to: khoảng thời gian random (phút) muốn check, ví dụ from: 2, to: 5 nghĩa là sẽ check random trong mỗi 2 - 5 phút
- print_course_detail: có log ra detail của course mà fetch được từ server trường không
