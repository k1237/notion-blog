import Image from "next/image";
import styles from "@/styles/profile.module.css";
import SNSIcons from "@/components/templates/SNSIcons";

export default function MainSP() {
    return(
        <section id={styles.career_sp}>
          <div className="mx-auto w-5/6 mt-5">
            <div className="mb-10">
              <Image
                src="/img/profile.jpeg"
                alt="プロフィール"
                width={250}
                height={250}
                className="rounded-full"
              />
              <SNSIcons/>
            </div>
            <div className="mb-10">
              <h2 className="font-bold">経歴</h2>
              <p>
                <span className="font-bold">2020年(28歳)</span>
                <br />
                前職でExcelVBAを触り業務効率化したことによりプログラミングに興味を持つ(高卒)
              </p>
              <br />
              <p>
                <span className="font-bold">2021年(29歳)</span>
                <br />
                職業訓練校にてWeb制作・Web開発の技術を学ぶ
              </p>
              <br />
              <p>
                <span className="font-bold">2022年(30歳)</span>
                <br />
                関西の自社・受託開発企業に就職(Webエンジニア)
                <br />
                主な使用技術:Vue.js/Laravel
              </p>
              <br />
              <p>
                <span className="font-bold">2023年(31歳)</span>
                <br />
                都内の自社・受託開発企業に転職予定(フロントエンドエンジニア)
                <br />
                主な使用技術:Next.js/TypeScript
              </p>
            </div>
          </div>
        </section>
    )
}