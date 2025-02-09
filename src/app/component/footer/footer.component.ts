import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent implements OnInit {
  public vehicle= new ArrayDataSource([
    {
      name:'Cars',
      children:[
        {
          name:'BMW'
        },
        {
          name:'Land Rover'
        }
      ]
    },
    {
      name:'Motor',
      children:[
        {
          name:'BMW'
        },
        {
          name:'Land Rover'
        }
      ]
    }
    

  ]);
  treeControl= new NestedTreeControl((node:any)=>node.children);
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  ngOnInit(): void {
    
  }
}

