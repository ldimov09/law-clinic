import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from '../case.service';

@Component({
	selector: 'app-submit-case-form',
	templateUrl: './submit-case-form.component.html',
	styleUrls: ['./submit-case-form.component.scss']
})
export class SubmitCaseFormComponent {

	selectedFiles: File[] | null = []

	selectedFileNames: string[] = [];
	constructor(private caseService: CaseService, private router: Router) { }

	form = new FormGroup({
		email: new FormControl('ka@ra.te', [Validators.required, Validators.email]),
		names: new FormControl('Син Лун Ким', [Validators.required]),
		title: new FormControl('Бизнес спрян', [Validators.required]),
		description: new FormControl(`Разровила баба огнището скришом, извадила питката и я потулила някъде. Ваню и Кунето претършуваха кътовете, пъхаха главичките си под леглото, ровиха се в долапа, гледаха повторно в пещта — няма я.
		— Бабо, дай ни питката, бабо! — замоли се Ваню.
		— Бабке, молим ти се, дай ни я! — изправи се пред нея сестричето му.
		— Шшшшт! Мирувайте, че видите ли хурката! — сопна се баба им.
		— Бабичко, много сме гладни ба! — с нажален глас пееше Кунето.
		— Я зяпни да видя!
		Пуста баба, все не вярва. Кунето разтвори като рибка малката си устица.
		— Пуй, че огладняло момичето ми — рече бабата, — ами сега? Ха почакайте още малко, да се върне от гората тетю ви с шейната.
		— Де е питката ба? — дръпна сукмана й Ваню и я погледна с очи, от които се гласяха да паднат две сълзи.
		— Де я. Отиде да си обиколи нивката. Не я ли видяхте, кога изскокна? Ей я там, хе, тича по пътя. Подир нея куцука Черню и джафка.
		Ваню и Кунето залепиха очи на изпотения прозорец. И видяха широкия, белия път. Нападал от небето сняг — един човешки бой. Затрупал дърветата, затрупал малките къщурки, затрупал гората. Студено и страшно е на полето. Големи постали вълци сноват по пъртината, гледат към село, където пушат комините, точат си зъбите и ръмжат. Никой не смее да ходи там. А тя, нищо и никаква питка, излязла от огъня с гореща глава, отърсила от гърба си въглените и се търкулнала. Хайде-е-е! Отива да си обиколи нивката.
		— Бабо… — обърна се умислен Ваню.
		— Ей.
		— Право ще кажеш, вярно ли е?
		— Кое?
		— Онуй, дето ни го разправи снощи, че уж питката ходела да си обикаля нивката.
		— Вярно е, чедо! Баба никога не лъже.
		— Ами далеч ли е нивката?
		— Много е далеч.
		— Чак до голямата гора, че зад нея? — показа с пръст Кунето.
		— Там.
		Двете деца пак опряха очи на прозореца. Пада ситен сняг. Сипе, сипе. Затрупва къщите. Те пъшкат под дебелия юрган и дъхът им едвам излиза през комините. Мудно крета по пътя една биволска шейна, накамарена с дърва. Преваля зад моста и чезне зад снега.
		— Бабо, хайде пак да ни разправиш за питката — обърнаха се двете замислени руси глави към очилатата бабичка.
		— Какво да ви разправям, нали снощи ви разправих.
		— Още един път искаме.
		— Хубаво. Слушайте! Тя, питката — започна баба им, — като излязла от огъня, озърнала се, смъкнала от гърба си въглените и полека се промъкнала през открехнатата врата. Плюла си на петите и ударила на бяг. Подир нея се втурнал Черню. Гонил я до моста, но не я достигнал, защото летяла напреде му като заек. Щом разбрал, че няма да я стигне, Черню лавнал два-три пъти подир оня, що духа, и се върнал.
		Минала питката през равното поле, навлязла в гората. Тъкмо влизала в гората и насреща й, насред пътя, отневиделица изскочил вълк, ей такъв, три дни нищичко не хапнал. Облещил се, тропнал с крак:
		— Стой, питке житена! Както съм прегладнял, наведнъж ще те лапна, ама ме е страх да не се задавя.
		— Недей, вълчо, брат да си ми! Ще се задавиш, много съм корава. Почакай ме тук, додето се върна! Мене ми е баба заръчала нивката да обиколя, където съм се родила, че да стана мека и сладка. Сега не съм за ядене: много съм гореща.
		Излъгал се глупавият вълк. Хванал вяра. Клекнал на пътя. Чака, чака, а студеният вятър брули ушите му.
		Питката хукнала. Бре нагоре, бре надоле, между старите дървета — право на нивата. Гледа — голяма, широка нива. Насред нивата — круша-самосянка, стои като самодива в бяла премяна. А под синора — кладенчето замръзнало.
		Навела се зачервената от студ питка и попитала:
		— Тук ли е житцето?
		— Тук съм — рекло то с тъничко гласче като на пчелица.
		— Ами будно ли е, или спи?
		— Будно е. Трае си на топло, под снега. Завило се презглава с бяла черга. Едвам диша.
		В гората било много страшно. Нивата — сред самата гора. Бучел лудият вятър. Дърветата плачели. А житцето се затоплило — нищичко не ще да знае.
		— Гладно ли е? — попитала го питката.
		— Не е.
		— Ха тогаз нека мирува, че напролет, когато се стопи белият снежен юрган и славеите запеят край нивата, стръкчетата му да израснат високо, едър клас да завържат. Ще напълнят житницата догоре. Нека знаят малките стръкчета — всичките ще станат питки.
		Засмяло се тихо под снега житцето. Уж го лъжела питката. Как може то да стане питка?
		Глупавичко е, защото е много мъничко — само на два месеца.
		Тръгнала си питката назад. Свършила си работата, иде си у дома. Не минала през гората, ами заобиколила по долината, през ливадето, поела дълбокия път — иде си.
		— Ами вълкът, бабо?
		— Вълкът клекнал сред гората, чака и трака със зъби, а студеният вятър брули ушите му.
		Пустата питка, колко е хитрушка!
		Вратникът скръцна. В двора влязоха шейни.
		— Ваньо-о-о, тичай — шейната!
		— Иде си тетью, ху-у-у-у! Какъв е побелял!
		— Хайде, Куне, налей топла вода в менчето, да си умие баща ти ръцете, защото цял ден е мръзнал. Пък аз ще отида в малката къща, да видя дошла ли си е питката. `, [Validators.required]),
		file: new FormControl(null, [Validators.required]),
	});

	get Email() {
		return this.form.get('email');
	}
	get Names() {
		return this.form.get('names');
	}
	get Title() {
		return this.form.get('title');
	}
	get Description() {
		return this.form.get('description');
	}

	handleSubmission(form: FormGroup) {
		const formData = new FormData();
		formData.append('title', this.form.value.title!);
		formData.append('description', this.form.value.description!);
		formData.append('email', this.form.value.email!);
		formData.append('names', this.form.value.names!);
		if (this.selectedFiles != null) {
			formData.append('files', JSON.stringify(this.selectedFiles));
		}

		console.log(this.selectedFiles);

		/*const { names, email, title, description } = form.value;*/

		this.caseService.createCase(formData).subscribe({
			next: (response: any) => {
				console.log(response);
				this.router.navigate(['/']);
			},
		});
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const files = input?.files!;
		if (files!.length > 0) {
			for (let i = 0; i < files.length; i++) {
				this.selectedFileNames.push(files[i].name);
				this.selectedFiles?.push(files[i]);
			}

		} else {
			this.selectedFileNames = []; // Reset the selectedFileNames if no file is selected
		}
		// Do something with the selected file
	}
}
