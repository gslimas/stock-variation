import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../src/app/api.service';
import { Variation } from 'src/app/models/variation.model'

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private apiService: ApiService) {
   
   }
  iniciarAzul : boolean = false; 
  title = 'stock-variation';
  indicators : any;
  datas: Date[];
  variacoes: Variation[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 30;
  countries: Country[];

  iniciar(){    
    this.iniciarAzul = true;
  }

  ngOnInit() {
		this.apiService.get().subscribe((data: any)=>{  
      this.indicators = data.chart.result[0].indicators.quote;       
      this.datas =  data.chart.result[0].timestamp;
      this.criarVariacao(this.indicators, this.datas); 
      this.refreshVariation();
    })  
  }
  
  criarVariacao(indicators, datas){
    let valorDia1 = 0;
    for (let i = 0; i <= 29; i++) {
      let variacao = new Variation();
      valorDia1 = indicators[0].close[0];
      variacao.dia = i+1;
      variacao.data = datas[i];
      variacao.valor = indicators[0].close[i].toFixed(2);
      if(i > 0){
        variacao.variacao_D1 = this.variacao(indicators[0].close[i-1],variacao.valor).toFixed(2);
        variacao.variacao_primeira = this.variacao(valorDia1,variacao.valor).toFixed(2);
      }
      else{
        variacao.variacao_D1 = '-';
        variacao.variacao_primeira = '-';
      }
      this.variacoes.push(variacao);
      
    }    

  }

  public  variacao(valorInicial, valorAtual): number{
    let valorGanho = (valorAtual - valorInicial );
    return (valorGanho/valorAtual) * 100;

  }
  refreshVariation() {
    this.variacoes
      .map((varia, i) => ({id: i + 1, ...varia}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
