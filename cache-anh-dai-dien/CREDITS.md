# Nguồn ảnh bìa

- Tệp: `laptop-va-dien-thoai.jpg`
- Tác giả: Pandu Pratana.
- Ảnh gốc: https://unsplash.com/photos/silver-macbook-on-black-table-MvesB-ofPMo
- Nguồn tải: https://images.unsplash.com/photo-1620312841970-bbcbdbcd5cb3?auto=format&fit=crop&w=1800&q=85
- Giấy phép: Unsplash License — https://unsplash.com/license
- Điều khoản: https://unsplash.com/terms
- Ngày tải: 2026-10-28.
- Ảnh minh họa laptop và điện thoại; không mô tả lỗi cache đang xảy ra thực tế trên hai thiết bị.
- Chỉ tải bản kích thước tối đa 1.800 px do dịch vụ ảnh cung cấp, không thay đổi nội dung ảnh.

## Sơ đồ trong bài

- `duong-di-ban-sao.png`, `anh-cu-quay-lai.png`, `lru-lfu.png`: sơ đồ gốc tạo riêng cho bài EyeBlogs, không lấy từ tài liệu tham khảo.
- Bản vector tương ứng nằm ở các tệp `.svg`; mã dựng hình và mô phỏng là `tao-so-do.mjs`.
- Chạy lại tại repo blog: `node images/cache-anh-dai-dien/tao-so-do.mjs`.
- Sơ đồ tiếng Anh có hậu tố `-en`; dựng lại bằng `node images/cache-anh-dai-dien/tao-so-do.mjs --en`. Cùng mô phỏng và bố cục, chỉ đổi nhãn.
- Ví dụ LRU/LFU dùng cache ba chỗ trên chuỗi `A B A B A B C D E A B`; kết quả lần lượt là 4 và 6 hit trên 11 yêu cầu. Đây là mô phỏng thuật toán đơn giản, không đo triển khai Redis.
