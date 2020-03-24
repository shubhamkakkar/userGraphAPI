// @ts-ignore
import jwt from "jsonwebtoken";
type TDecodeJWT = {
    email: string;
};

type  TEmailFromToken = {
    token:string
}

export default function emailFromToken({token}:TEmailFromToken):string {
    // @ts-ignore
    const {email}: TDecodeJWT = jwt.verify(token, 'string');
    return email;

}
