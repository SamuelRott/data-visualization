# Data-vizualisation

This repo is a playground for Data-vizualisation using [D3](https://github.com/d3) and data from [radio4000-api](https://github.com/Internet4000/radio4000-api-docs).

The API being deployed with [https://zeit.co/now](https://zeit.co/now) its sleep if its not in use for 30 seconds (they implemented this to save resources), so you may need to refresh the page to "activate" it.

Dev link [http://r4-visualization.surge.sh/](http://r4-visualization.surge.sh/).

## React boilerplate

Thank you [pfft](https://github.com/jfalxa/pfft)

## Ideas

1. only get channels active in last 30 days
2. get most added track the last 30 days
3. how many tracks added the last 30 days

## Scripts

- `yarn start` to start dev server
- `yarn build` to compile JS and CSS to the `public/` dir so you can deploy it
- `yarn test` to run tests with ava
- `yarn coverage` to run tests with coverage reports
- `yarn run clean` to remove previous build results
