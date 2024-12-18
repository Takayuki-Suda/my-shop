import Link from "next/link";
import { usePathname } from "next/navigation";
import "../app/styles/globals.css"; // パスを修正

const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            My Shop
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                >
                  ホーム
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className={`nav-link ${
                    pathname === "/about" ? "active" : ""
                  }`}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/checkout"
                  className={`nav-link ${
                    pathname === "/checkout" ? "active" : ""
                  }`}
                >
                  購入
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/products"
                  className={`nav-link ${
                    pathname === "/products" ? "active" : ""
                  }`}
                >
                  商品一覧
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/cart"
                  className={`nav-link ${pathname === "/cart" ? "active" : ""}`}
                >
                  カート
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* カスタムスタイル */}
      <style jsx>{`
        .navbar-nav .nav-link {
          position: relative;
          color: black;
          transition: color 0.3s ease;
        }

        .navbar-nav .nav-link.active {
          color: #ff6f61 !important; /* アクティブリンクの色 */
          font-weight: bold;
        }

        .navbar-nav .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: #ff6f61;
          transition: width 0.3s ease;
        }

        .navbar-nav .nav-link:hover::after {
          width: 100%; /* ホバー時にアンダーラインを表示 */
        }

        /* ホバー時に文字色も変更 */
        .navbar-nav .nav-link:hover {
          color: #e14d42 !important;
        }
      `}</style>
    </header>
  );
};

export default Header;
