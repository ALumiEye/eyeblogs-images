import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const sharp = createRequire(new URL('../../package.json', import.meta.url))('sharp');

// Sơ đồ gốc của bài; chạy từ bất kỳ thư mục nào bằng Node.js.
const folder = new URL('./', import.meta.url);
const english = process.argv.includes('--en');
const labels = {
  'Bản ảnh bạn thấy có thể đến từ đâu?': 'Where can the image you see come from?',
  'Bản sao phù hợp ở tầng trước có thể tránh một lượt đi tiếp.': 'A usable copy at an earlier layer can avoid another request.',
  'TRÌNH DUYỆT': 'BROWSER',
  'Bản trên thiết bị': 'Copy on your device',
  'Bản ở máy trung gian': 'Copy at an intermediary',
  'MÁY CHỦ GỐC': 'ORIGIN SERVER',
  'Nội dung tại nguồn': 'Content at the source',
  'Cần hỏi tiếp': 'Continue if needed',
  'Có thể trả ngay': 'Can answer immediately',
  'Có thể trả bản lưu': 'Can serve a cached copy',
  'Trả từ nguồn': 'Serve from the origin',
  'Còn được phép dùng ≠ chắc chắn là phiên bản mới nhất tại nguồn': 'Allowed to reuse ≠ guaranteed to be the latest version at the source',
  'Ảnh cũ quay lại sau khi đã xóa cache': 'Old data returns after the cache is cleared',
  'Hai yêu cầu chạy song song; thời gian đi từ trên xuống.': 'Two concurrent requests; time runs from top to bottom.',
  'Bước': 'Step',
  'YÊU CẦU ĐỌC': 'READ REQUEST',
  'YÊU CẦU CẬP NHẬT': 'UPDATE REQUEST',
  'Không thấy hồ sơ trong cache': 'Profile missing from cache',
  'Đọc được phiên bản 1 từ nguồn': 'Read version 1 from the source',
  'Vẫn giữ kết quả, chưa ghi cache': 'Holding result; not cached yet',
  'Lưu phiên bản 2 tại nguồn': 'Save version 2 at the source',
  'Xóa cache hồ sơ': 'Clear the profile cache',
  'Ghi phiên bản 1 vào cache': 'Write version 1 into the cache',
  'Nguồn đã là phiên bản 2, nhưng cache lại giữ phiên bản 1.': 'The source holds version 2, but the cache holds version 1.',
  'Ba chỗ nhớ, hai cách chọn thứ phải quên': 'Three slots, two ways to choose what to forget',
  'Chuỗi giả lập: xem A, B nhiều lần → quét C, D, E → quay lại A, B.': 'Simulated requests: repeat A, B → scan C, D, E → return to A, B.',
  'Yêu cầu': 'Request',
  'H = có sẵn (hit)     M = phải lấy lại (miss)': 'H = available (hit)     M = fetch again (miss)',
  'Dưới mỗi ô: nội dung cache sau yêu cầu. LFU là bản đơn giản cho ví dụ này.': 'Below each cell: cache contents after the request. LFU is simplified for this example.',
};
const c = { bg: '#16181c', panel: '#20242b', line: '#48515f', text: '#e2e5e9', muted: '#a4adba', blue: '#8fa9c9', gold: '#e8b05a', green: '#91bda5' };
const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, s, size = 24, fill = c.text, anchor = 'start') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}">${esc(english ? labels[s] ?? s : s)}</text>`;
const box = (x, y, w, h, color = c.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${c.panel}" stroke="${color}" stroke-width="2"/>`;
const arrow = (x1, y1, x2, y2, color = c.blue) => `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="3" marker-end="url(#arrow)"/>`;
async function save(name, height, body) {
  if (english) name += '-en';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10" fill="${c.blue}"/></marker></defs><rect width="1200" height="${height}" fill="${c.bg}"/><g font-family="Arial, sans-serif">${body}</g></svg>`;
  await writeFile(new URL(`${name}.svg`, folder), svg);
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL(`${name}.png`, folder)));
}

await save('duong-di-ban-sao', 570, [
  text(55, 60, 'Bản ảnh bạn thấy có thể đến từ đâu?', 34),
  text(55, 99, 'Bản sao phù hợp ở tầng trước có thể tránh một lượt đi tiếp.', 23, c.muted),
  box(55, 180, 280, 145, c.green), box(460, 180, 280, 145, c.blue), box(865, 180, 280, 145, c.gold),
  text(195, 226, 'TRÌNH DUYỆT', 24, c.green, 'middle'),
  text(195, 269, 'Bản trên thiết bị', 24, c.text, 'middle'),
  text(600, 226, 'CDN', 24, c.blue, 'middle'),
  text(600, 269, 'Bản ở máy trung gian', 24, c.text, 'middle'),
  text(1005, 226, 'MÁY CHỦ GỐC', 24, c.gold, 'middle'),
  text(1005, 269, 'Nội dung tại nguồn', 24, c.text, 'middle'),
  arrow(345, 250, 450, 250), arrow(750, 250, 855, 250),
  text(397, 158, 'Cần hỏi tiếp', 20, c.muted, 'middle'), text(802, 158, 'Cần hỏi tiếp', 20, c.muted, 'middle'),
  arrow(195, 335, 195, 400), arrow(600, 335, 600, 400), arrow(1005, 335, 1005, 400),
  text(195, 440, 'Có thể trả ngay', 24, c.green, 'middle'),
  text(600, 440, 'Có thể trả bản lưu', 24, c.blue, 'middle'),
  text(1005, 440, 'Trả từ nguồn', 24, c.gold, 'middle'),
  text(55, 525, 'Còn được phép dùng ≠ chắc chắn là phiên bản mới nhất tại nguồn', 25, c.muted),
].join(''));

await save('anh-cu-quay-lai', 690, [
  text(55, 60, 'Ảnh cũ quay lại sau khi đã xóa cache', 34),
  text(55, 99, 'Hai yêu cầu chạy song song; thời gian đi từ trên xuống.', 23, c.muted),
  text(105, 155, 'Bước', 22, c.muted), text(400, 155, 'YÊU CẦU ĐỌC', 25, c.blue, 'middle'), text(920, 155, 'YÊU CẦU CẬP NHẬT', 25, c.gold, 'middle'),
  ...[
    ['1', 'Không thấy hồ sơ trong cache', ''],
    ['2', 'Đọc được phiên bản 1 từ nguồn', ''],
    ['3', 'Vẫn giữ kết quả, chưa ghi cache', 'Lưu phiên bản 2 tại nguồn'],
    ['4', '', 'Xóa cache hồ sơ'],
    ['5', 'Ghi phiên bản 1 vào cache', ''],
  ].map(([n, left, right], i) => {
    const y = 190 + i * 76;
    return text(110, y + 32, n, 25, c.muted) +
      (left ? box(180, y, 450, 52, i === 4 ? c.gold : c.line) + text(405, y + 34, left, 22, i === 4 ? c.gold : c.text, 'middle') : '') +
      (right ? box(705, y, 440, 52, c.gold) + text(925, y + 34, right, 22, c.text, 'middle') : '');
  }),
  text(55, 630, 'Nguồn đã là phiên bản 2, nhưng cache lại giữ phiên bản 1.', 27, c.gold),
].join(''));

// LFU minh họa đếm lượt dùng của mục còn trong cache; hòa thì bỏ mục cũ hơn.
const requests = ['A', 'B', 'A', 'B', 'A', 'B', 'C', 'D', 'E', 'A', 'B'];
function simulate(policy) {
  const cache = new Map();
  return requests.map((key, i) => {
    const hit = cache.has(key);
    if (hit) {
      const entry = cache.get(key);
      entry.count += 1; entry.used = i;
    } else {
      if (cache.size === 3) {
        const [victim] = [...cache].sort((a, b) => policy === 'LRU'
          ? a[1].used - b[1].used
          : a[1].count - b[1].count || a[1].used - b[1].used)[0];
        cache.delete(victim);
      }
      cache.set(key, { count: 1, used: i });
    }
    return { key, hit, cache: [...cache.keys()].sort().join(' ') };
  });
}
const lru = simulate('LRU'); const lfu = simulate('LFU');
console.log(JSON.stringify({ requests, LRU: lru, LFU: lfu }, null, 2));
const cellX = (i) => 245 + i * 82;
await save('lru-lfu', 650, [
  text(55, 60, 'Ba chỗ nhớ, hai cách chọn thứ phải quên', 34),
  text(55, 99, 'Chuỗi giả lập: xem A, B nhiều lần → quét C, D, E → quay lại A, B.', 23, c.muted),
  text(55, 170, 'Yêu cầu', 24, c.muted),
  ...requests.map((s, i) => text(cellX(i), 170, s, 27, i >= 6 && i <= 8 ? c.gold : c.text, 'middle')),
  ...[['LRU', lru, 215], ['LFU', lfu, 370]].map(([label, rows, y]) => [
    text(55, y + 35, label, 28, c.blue),
    text(55, y + 75, `${rows.filter((r) => r.hit).length}/11 hit`, 23, c.muted),
    ...rows.map((r, i) => box(cellX(i) - 35, y, 70, 62, r.hit ? c.green : c.line) + text(cellX(i), y + 39, r.hit ? 'H' : 'M', 26, r.hit ? c.green : c.muted, 'middle') + text(cellX(i), y + 100, r.cache, 18, c.text, 'middle')),
  ].join('')),
  text(55, 550, 'H = có sẵn (hit)     M = phải lấy lại (miss)', 24, c.muted),
  text(55, 595, 'Dưới mỗi ô: nội dung cache sau yêu cầu. LFU là bản đơn giản cho ví dụ này.', 22, c.muted),
].join(''));
