import { Payload } from "payload";
import fs from "fs"
import path from "path"

export const seed_init = async (payload: Payload): Promise<void> => {
	const user :any = async (email:string, password:string, role:any) => {
		payload.logger.info('Creating user ' + email)
		try {
			await payload.create({
				collection: 'users',
				data: {
					email    : email,
					password : password,
					//role     : role
				},
			})
		}
		catch (error) { payload.logger.error('Error creating user ' + email)}
	}

	payload.logger.info('===============================================')
	payload.logger.info('Seeding Payload...')
	const filePath = path.resolve('src', '.seed');
	if ((fs.existsSync(filePath))) {
		payload.logger.warn('Seed has already been planted - skipping...')
		payload.logger.info('===============================================')
		return ;
	}

	payload.logger.info('Planting seed at ./src/.seed ...')
	fs.closeSync(fs.openSync('src/.seed', 'w'));

	await user("admin@admin.com",   "admin",   "Admin"  )
	await user("guest@guest.com",   "welcome", "Guest"  )
	await user("editor@editor.com", "welcome", "Editor" )







	payload.logger.info('Done.')
	payload.logger.info('===============================================')

}
