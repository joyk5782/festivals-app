type Festival = {
  id: number
  name: string
  description: string | null
  start_date: string | null
  end_date: string | null
  location: string | null
  created_at: string
  updated_at: string
}

type Props = {
  festival: Festival
}

export default function FestivalCard({ festival }: Props) {
  return (
    <article className="card">
      <h2>{festival.name}</h2>

      {festival.description && <p>{festival.description}</p>}

      <p>
        기간: {festival.start_date} ~ {festival.end_date}
      </p>

      {festival.location && <p>장소: {festival.location}</p>}

      <p>등록: {new Date(festival.created_at).toLocaleDateString()}</p>
    </article>
  )
}