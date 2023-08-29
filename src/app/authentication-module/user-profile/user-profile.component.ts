import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any; // Adicione esta linha

  constructor() { }

  ngOnInit(): void {
    // Aqui você precisa preencher o usuário com dados reais.
    // Normalmente você faria isso pegando os dados do serviço de autenticação.
    this.user = {
      name: 'Test User',
      email: 'test@example.com',
      // Outros detalhes do usuário
    };
  }
}

