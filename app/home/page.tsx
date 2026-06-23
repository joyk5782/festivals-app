'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import FestivalCard from '@/app/home/components/FestivalCard'

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

export default function Home() {
  const [festivals, setFestivals] = useState<Festival[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('festivals')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        setErrorMessage(error.message)
      } else {
        setFestivals((data ?? []) as Festival[])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <p>데이터를 불러오는 중...</p>
  }

  if (errorMessage) {
    return (
      <section>
        <h1>Supabase 연결 오류</h1>
        <p>{errorMessage}</p>
      </section>
    )
  }

  return (
    <section>
      <h1>페스티벌 안내</h1>

      <div className="grid">
        {festivals.map((festival) => (
          <FestivalCard key={festival.id} festival={festival} />
        ))}
      </div>
    </section>
  )
}