import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//TODO: "spec.ts <--"
//TODO: 😨 es la sintaxis de Jasmin!

describe(`(1) TEST del componente "AppComponent"`, () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule // Para realizar pruebas al HttpClient
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

  });

  it('Debe de existir el AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance
    expect(app).toBeTruthy(); 
  });

  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance   // Instancia del componente
    fixture.detectChanges() // Necesitamos detectar cambios por que asignamos variables ejm: El formulario en el ngOnInit

    const email = app.form.controls['email'];   
    email.setValue('leifer33@gmail.com');

    expect(app.form.invalid).toBeTrue(); 
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()

    let email = app.form.controls['email']
    let password = app.form.controls['password']
    let result = app.form.controls['result']

    email.setValue('leifer33@gmail.com')
    password.setValue('123456')
    result.setValue('1')


    expect(app.form.invalid).toBeFalse(); //TODO: ✔
  });

  xit(`Debe de actulizar datos de usuario`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()

    let email = app.form.controls['email']
    let password = app.form.controls['password']

    email.setValue('leifer33@gmail.com')
    password.setValue('123456')

    const btnElement = fixture.debugElement.query(By.css('button.btn'))
    btnElement.nativeElement.click()
    const testData = { user: 1 }

    console.log("CHECK", app.isCheck);
    console.log("DATA", app.dataSession);
    
    expect(app.isCheck).toEqual(testData)
  });

});
