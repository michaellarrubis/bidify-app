import { z } from 'zod'

export const createOrderSchema = z.object({
  body: z
    .object({
      id: z.string(),
      merchant_id: z.string(),
      products_variant: z.array(
        z.object({
          product_type: z.number(),
          id: z.string(),
          num: z.number(),
          option: z.string(),
        })
      ),
      customer_information: z.object({
        customer_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        address2: z.string(),
        address1: z.string(),
        city: z.string(),
        pref: z.string(),
        zipcode: z.string(),
        tel: z.string(),
        card_token: z.string().optional(),
      }),
      shipping_information: z.object({
        address2: z.string(),
        address1: z.string(),
        city: z.string(),
        pref: z.string(),
        zipcode: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        tel: z.string(),
      }),
      options: z.object({
        shipping: z.number(),
        coupon: z.string(),
        payment: z.number(),
        callback_url: z.string(),
      }),
    })
    .strict(),
})
