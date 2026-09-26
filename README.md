# eyeblogs-images

Kho ảnh cho blog [EyeBlogs](https://eyeblogs.pages.dev) (repo code: `ALumiEye/eyeblogs`).

Repo này được clone vào thư mục `images/` bên trong repo blog. Blog tìm ảnh theo thứ tự:

1. `images/<đường-dẫn>` trên máy — để xem trước khi viết bài
2. `https://raw.githubusercontent.com/ALumiEye/eyeblogs-images/main/<đường-dẫn>` — dùng khi build trên Cloudflare
3. khung placeholder hiện alt text — khi không tìm thấy ở đâu

## Quy ước

- Tổ chức theo bài viết: `<slug-bai-viet>/<ten-anh>.png`, vd `kafka/consumer-group-partitions.png`.
- Tên file viết thường, không dấu, nối bằng `-`.
- Diagram: ưu tiên SVG. Biểu đồ: PNG `dpi=150` hoặc SVG. Ảnh chụp: nén trước (vd squoosh.app), nên < 300 KB.
- **Push ảnh ở repo này TRƯỚC, rồi mới push bài viết ở repo blog.**

## Dùng trong bài (repo blog)

```mdx
import Figure from '../../../components/mdx/Figure.astro';

<Figure name="kafka/consumer-group-partitions.png" alt="Mô tả nội dung ảnh" caption="Hình 1. ..." />
```
