export type PricingOption = 0 | 1 | 2

export type Content = {
    id: string
    creator: string
    title: string,
    pricingOption: PricingOption,
    imagePath: string,
    price: number
}

/* Sample data
{
    "id": "content-001",
    "creator": "Adam",
    "title": "Yellow green coat",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_1.jpeg",
    "price": 50
  },
*/