"use server"

import axios from "axios"
import * as cheerio from "cheerio"

async function getStaticProps(url : FormDataEntryValue) {

  const { data } = await axios.get(url.toString())
  const $ = cheerio.load(data)
  const name = $('#productTitle').text()
  const priceWhole = $('.a-price-whole').first().text()
  const priceFraction = $('.a-price-fraction').first().text()
  const symbol = $('.a-price-symbol').first().text()
  const image = $('#landingImage').attr('src')

  const price = parseFloat(`${parseInt(priceWhole)}.${priceFraction}`)
  const lastScraped = new Date().toISOString()

  return {
    props: {
      name: name.trim(),
      price: price,
      symbol: symbol,
      image: image,
      lastScraped: lastScraped
    },
    revalidate: 3600,
  }
}

export default getStaticProps