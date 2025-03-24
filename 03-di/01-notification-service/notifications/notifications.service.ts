import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { appendFile } from "node:fs";

@Injectable()
export class NotificationsService {
	constructor(private readonly configService: ConfigService) {
		console.log('sender email:', this.configService.get('SENDER_EMAIL'))
	}

	sendEmail(to: string, subject: string, message: string): void {
		if (!to || !subject || !message) {
			throw new BadRequestException('Email parameters cannot be empty');
		}
		const notification = `Email sent to ${to}: [${subject}] ${message}`
		console.log(notification);
		appendFile(
			'notifications.log',
			`[${(new Date()).toISOString()}] [INFO] ${notification}\n`,
			(err) => {
				if (err) {
					console.error(err);
				}
			});
	}

	sendSMS(to: string, message: string): void {
		if (!to || !message) {
			throw new BadRequestException('SMS parameters cannot be empty');
		}
		const notification = `SMS sent to ${to}: ${message}`;
		console.log(notification);
		appendFile(
			'notifications.log',
			`[${(new Date()).toISOString()}] [INFO] ${notification}\n`,
			(err) => {
				if (err) {
					console.error(err);
				}
			});
	}
}
