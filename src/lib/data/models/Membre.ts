import type { Row } from '@vincjo/datatables/remote';

export interface Membre extends Row {
	id: number;
	licence_renewal_type: string;
	subscription_name: string;
	birthday: string;
	sex: string;
	birth_place: string;
	activity: string;
	judo_belt: string;
	postal_address: string;
	email_address: string;
	telephone_number: string;
	emergency_contacts: string;
	activity_authorization: boolean;
	release_and_waive_agreement: string;
	comments: string;
	created_at: string;
	medical_certificate: boolean;
	licence_fee_paid: boolean;
	subscription_state: number;
	extranet_validation_date: string;
	extranet_validation_check: boolean;
	dojo: string;
	annee_saison: string;
	categorie: string;
	selected: boolean;
}