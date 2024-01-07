Assuming you install PocketBase in a `pocketbase` folder inside this project to keep things simple, create PocketBase types running this from the `pocketbase` folder:

```sh
npx pocketbase-typegen --db ./pb_data/data.db --out ../src/lib/pocketbase-types.ts
```

Then run PocketBase

```sh
./pocketbase serve --http=0.0.0.0:8099
```

add `POCKETBASE_URL=http://127.0.0.1:8099` to `.env`
