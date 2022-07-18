export class Alert {
  constructor(
    public alertType: AlertType,
    public message: string
  ) { }
}

export enum AlertType {
  SUCCESS,
  WARNING,
  DANGER,
  INFO
}