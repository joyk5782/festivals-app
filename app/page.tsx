import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('test_posts')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Supabase 연결 오류</h1>
        <pre>{error.message}</pre>
      </main>
    )
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Supabase 연결 테스트</h1>

      {data?.map((post) => (
        <div key={post.id}>
          {post.id}. {post.title}
        </div>
      ))}
    </main>
  )
}