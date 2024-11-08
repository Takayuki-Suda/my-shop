npm run dev
Strip を用いて決済の仕組みを行っている

Stripe のテストカードを使用する場合、
カード番号: 4242 4242 4242 4242
有効期限（月/年）: 11/25（2025 年 11 月）
CVC: 123
郵便番号 12345

データベース(Prisma)
npx prisma -v
npx prisma init

.env ファイルの設定
prisma/schema.prisma ファイルの設定

Prisma クライアントの生成
npx prisma generate

マイグレーションの実行
npx prisma migrate dev --name init

mysql に接続できるか確認
mysql -u root -p

prisma を確認
npx prisma studio

ユーザー作成
npx tsx prisma/seed.ts
