import styles from '@/styles/blog/sidebar.module.css'
import Image from "next/image";
import SNSIcons from './SNSIcons';

export default function Sidebar() {
    return (
      <div className="border-2 rounded-2xl border-sky-500 mt-5 shadow-2xl p-2 w-72">
           <section className="mt-5">
              <Image
                src="/img/profile.jpeg"
                alt="プロフィール"
                width={300}
                height={300}
                className={styles.profileimg}
              />
              <p className="mt-2 px-2 font-bold">K:31歳/高卒/関西在住</p>
              <p className="mt-2 px-2">都内の自社・受託開発企業にてフロントエンドエンジニアとして転職予定</p>
              <p className="mt-5 px-2 font-bold">主な使用技術</p>
              <p className="mt-2 px-2 ">TailwindCSS<br/>Next.js<br/>TypeScript<br/>Jest<br/>Go<br/>Docker<br/></p>
              <SNSIcons/>
            </section>
      </div>
    )
  }
  