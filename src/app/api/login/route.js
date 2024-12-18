export async function POST(req) {
  try {
    const { username, password } = await req.json()

    if (username === 'admin' && password === '1234') {
      return Response.json({ success: true, token: 'fake-jwt-token' }, { status: 200 })
    }

    return Response.json({ success: false, message: 'Invalid username or password' }, { status: 401 })
  } catch (error) {
    return Response.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
