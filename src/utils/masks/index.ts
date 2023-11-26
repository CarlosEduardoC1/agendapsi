export function phoneMask(phone: string): string {
  return phone
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2");
}

export function moneyMask(money: string | number): string {
  return String(money)
    .replace(/\D/g, "")
    .replace(/\D/g, ".")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
}
