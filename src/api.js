import { createHash } from 'node:crypto';

const publicKey = "e4310f5363438e771574a562327bf668"
const privateKey = "25a23b65a25ed01647bf6f5000f26296ccb6e1ec"
/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const ts =  Date.now();

    const hash = await getHash(publicKey, privateKey, ts);
    const param = {apikey: publicKey, ts: ts, hash : hash};

    console.log(param)
    const response = await fetch(url+"apikey="+publicKey+"&ts="+ts+"&hash="+hash);

    /*const response = await fetch(url, {
        method: 'get',
        param: JSON.stringify(param),
        headers: {'Content-Type': 'application/json'}
    });*/
    const data = await response.json();
    return data;
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {

    return createHash('md5').update(timestamp+privateKey+publicKey).digest('hex');
}