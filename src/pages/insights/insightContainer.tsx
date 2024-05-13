import { LoadingOutlined } from "@ant-design/icons"
import { lazy, Suspense } from "react"
import { Header } from "../../component/common/header/header"
import { QueryTab } from "../../component/query/queryTab/QueryTab"
import styles from "./Insight.module.css"
const ExplorerContainer = lazy(
  () => import("../../component/explorer/ExplorerContainer"),
)
export const InsightsContainer = () => {
  return (
    <div className={styles.home}>
      <Header title="Sql Editor" user={"Rohit singh"} />
      <Suspense
        fallback={
          <div>
            <LoadingOutlined />
          </div>
        }
      >
        <div className={styles.insightContainer}>
          <ExplorerContainer />
          <QueryTab />
        </div>
      </Suspense>
    </div>
  )
}
