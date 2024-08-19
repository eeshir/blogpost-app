import AuthChecker from '@/hooks/authChecker'

const Dashboard = () => {
    AuthChecker({page1:"/blogs",page2:"/signup"})
  return (
    <></>
  )
}

export default Dashboard