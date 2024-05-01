import bcrypt from "bcrypt";

const saltRounds = 10;

async function encrypt(pwd) {
  try {
    const hash = await bcrypt.hash(pwd, saltRounds);
    return hash;
  } catch (error) {
    console.error(error);
  }
}

async function decrypt(pwd, hashedPassword) {
  try {
    let result = await bcrypt.compare(pwd, hashedPassword);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export { encrypt, decrypt };
