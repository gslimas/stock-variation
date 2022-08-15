import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../src/app/api.service';
import { Variation } from 'src/app/models/variation.model'

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
