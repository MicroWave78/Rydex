export default async function CarsByTypePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <div className="cars-by-type-page">Showing cars of type: {id}</div>
}