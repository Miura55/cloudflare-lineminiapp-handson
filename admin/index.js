addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // POSTリクエストかどうかをチェック
    if (request.method === 'POST') {
        // ユーザーが送信したフォームデータを取得
        const formData = await request.formData()
        const key = formData.get('key') // ユーザーが入力したキーを取得

        // ユーザーが入力したキーに基づいてKVからデータを取得
        const data = await WORKERS_KV.get(key)

        if (!data) {
            return new Response('Item not found', { status: 404 })
        }

        // 取得したデータをJSONに変換
        const menu = JSON.parse(data)

        // HTMLの生成
        const html = `
		<html>
		  <head>
			<title>Menu</title>
			<style>
			  body {
				font-family: Arial, sans-serif;
				padding: 20px;
			  }
			  h1 {
				text-align: center;
			  }
			  .menu-item {
				margin: 10px 0;
				display: flex;
				align-items: center;
			  }
			  .menu-item img {
				width: 100px;
				height: 100px;
				margin-right: 20px;
			  }
			</style>
		  </head>
		  <body>
			<h1>Menu</h1>
			${generateMenuItems(menu)}
		  </body>
		</html>
	  `

        // HTMLレスポンスを返す
        return new Response(html, {
            headers: { 'Content-Type': 'text/html' },
        })
    }

    // GETリクエストの場合、フォームを表示する
    const html = `
	  <html>
		<head>
		  <title>Enter Key</title>
		</head>
		<body>
		  <h1>Enter the Key</h1>
		  <form method="POST">
			<label for="key">Key:</label>
			<input type="text" id="key" name="key" required>
			<button type="submit">Submit</button>
		  </form>
		</body>
	  </html>
	`

    // HTMLレスポンスを返す
    return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
    })
}

// メニューアイテムをHTMLとして生成する関数
function generateMenuItems(menu) {
    return menu.map(item => {
        return `
		<div class="menu-item">
		  <img src="${item.image}" alt="${item.name}">
		  <div>
			<h3>${item.name}</h3>
			<p>Price: $${item.price}</p>
		  </div>
		</div>
	  `
    }).join('')
}
