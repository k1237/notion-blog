import Image from "next/image";

export default function Main() {
  return (
    <div className="lg:flex mx-auto mt-10">
      <div className="lg:w-1/3">
        <a
          href="https://memoto.k-program.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/img/memoto.png" alt="memoto" width={1280} height={720} />
        </a>
        <div className="w-96 lg:w-full mx-auto p-5 my-5">
          <h3 className="font-bold">memoto</h3>
          <hr />
          <p>楽器練習用に曲とプレイリストを保存できるアプリ</p>
          <p>※現在も個人で使用しながら、時々修正などを加えています。</p>
          <p>※使用するにはログイン・新規登録が必要です</p>
          <p className="mt-5">
            <span className="font-bold">使用技術</span>
            <br />
            TailwindCSS <br />
            React
            <br />
            TypeScript <br />
            Inertia.js <br />
            Laravel <br />
            MariaDB
            <br />
            Docker(ローカル環境) <br />
            GithubActions(自動デプロイ) <br />
            Xserver(本番環境)
          </p>
        </div>
      </div>
      <div className="lg:w-1/3">
        <a
          href="https://wonderful-cray-9a9c1f.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/img/autochat.png"
            alt="memoto"
            width={1280}
            height={720}
          />
        </a>
        <div className="w-96 lg:w-full mx-auto p-5 my-5">
          <h3 className="font-bold">オートチャット</h3>
          <hr />
          <p>
            配信のコメント欄を疑似体験できるように200個の質問をランダムに生成します
          </p>
          <p className="mt-5">
            <span className="font-bold">使用技術</span>
            <br />
            TailwindCSS <br />
            Nuxt.js
            <br />
            TypeScript <br />
            Inertia.js <br />
            firebase <br />
            CircleCI <br />
            Netlify
          </p>
        </div>
      </div>
      <div className="lg:w-1/3"></div>
    </div>
  );
}
