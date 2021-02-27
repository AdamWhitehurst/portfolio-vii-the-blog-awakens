import Signature from '@layouts/signature'

export default function BaseLayout({ children }) {
  return (
    <div
      id="base-layout-container"
    >
      {children}
      <Signature />
    </div>
  )
}
