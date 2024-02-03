"use server"

import axios from "axios"
import * as cheerio from "cheerio"

async function getStaticProps(url : FormDataEntryValue) {

  try {
    const { data } = await axios.get(url.toString())
     
    if (!data) throw Error

    const $ = cheerio.load(data)
    const name = $('#productTitle').text()
    const priceWhole = $('.a-price-whole').first().text()
    const priceFraction = $('.a-price-fraction').first().text()
    const symbol = $('.a-price-symbol').first().text()
    const image = $('#landingImage').attr('src') 
    
    const price = parseFloat(`${parseInt(priceWhole)}.${priceFraction}`) || parseFloat($('.a-price').first().text().replace(',','.'))
    const lastScraped = new Date().toISOString()

    return {
      props: {
        name: name.trim(),
        price: price,
        symbol: symbol || '€',
        image: image,
        lastScraped: lastScraped
      },
      error: undefined,
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: undefined,
      error: 'Error! Can\'t load product data. Try again',
      revalidate: 60,
    }
  }
  
}

export default getStaticProps