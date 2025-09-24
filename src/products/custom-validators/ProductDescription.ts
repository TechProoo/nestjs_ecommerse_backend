import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@ValidatorConstraint({ name: 'ProductDescription', async: true })
export class ProductDescription implements ValidatorConstraintInterface {
  private message = '';

  async validate(description: string) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not defined.');
    }

    // ✅ Groq client
    const client = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const prompt = `
      Given the description provided below,
      check if it makes sense from a user perspective and
      that it doesn't contain any offensive content or vague information.

      Description: "${description}"

      If valid, return "valid"; otherwise return "invalid" + the reason.
    `;

    // ✅ Call Groq model
    const response = await client.responses.create({
      model: 'openai/gpt-oss-20b', // or any Groq model you want
      input: prompt,
    });

    // ✅ Extract text output
    const text = (response.output_text ?? '').trim();

    // ✅ Determine validity
    const isValid = !text.toLowerCase().startsWith('invalid');
    if (!isValid) {
      this.message = text;
    }

    return isValid;
  }

  defaultMessage() {
    // Will be returned when validation fails
    return this.message || 'Invalid product description.';
  }
}
