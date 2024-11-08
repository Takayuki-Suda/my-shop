import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
}

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null); // 初期値をnullにし、型を明示

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/getUser");
      const data = await response.json();
      setUser(data); // 取得したデータをセット
    };

    fetchUser();
  }, []);

  if (!user) return <div>ユーザー情報を読み込み中...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>所持金額: ¥{user.balance}</p>
    </div>
  );
};

export default UserPage;
