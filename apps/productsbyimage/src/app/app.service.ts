import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';
@Injectable()
export class AppService {

  private axios: Axios = null;

  constructor() {
    this.axios = new Axios({});
    this.axios.interceptors.response.use(r => r, this.handleAxiosError);
  }

  private handleAxiosError(err) {
    console.log(err);
  }

  private async getProductsFromImage(url: string) {
    try {
      var aliexpressProducts = await this.axios.request({
        method: 'GET',
        url: 'https://magic-aliexpress1.p.rapidapi.com/api/products/searchByImage',
        params: {
          url: url
        },
        headers: {
          'x-rapidapi-host': 'magic-aliexpress1.p.rapidapi.com',
          'x-rapidapi-key': 'Your_TOKEN'
        }
      })
    } catch (e) {
      throw e;
    }
    return JSON.parse(aliexpressProducts.data);
  }


  async getData(url: string): Promise<any> {
    let products;
    products = await this.getProductsFromImage(url)
    return products;
  }
}
