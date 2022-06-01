import { UpdatePostDto } from './../dto/update-post.dto';
import { CreatePostDto } from './../dto/create-post.dto';
import { PrismaService } from './../../prisma/prisma.service';
import { PostEntity } from '../entities/post.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/commom/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDTO: CreatePostDto): Promise<PostEntity> {
    //Destructering para pegar o email do autor vindo do create DTO de Post.
    const { authorEmail } = createPostDTO;

    //Deletando o email do objeto do DTO, para não causar conflito com o schema do prisma
    //que não possui email para Post.
    delete createPostDTO.authorEmail;

    //Buscando Usuario (para capturar o ID), pelo email.
    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    //Caso não encontre o usuario com o email passado pelo DTO
    if (!user) {
      throw new NotFoundError('Author not found.');
    }

    //Spread para concatenar as informações do DTO para fazer o create.
    const data: Prisma.PostCreateInput = {
      ...createPostDTO,
      author: {
        //conecta a criação do post ao author com o email passado
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.create({
      data: data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<PostEntity> {
    // By unique identifier
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updatePostDTO: UpdatePostDto): Promise<PostEntity> {
    //Repetindo o mesmo processo do create, mas antes se verifica se está sendo enviado um email.
    const { authorEmail } = updatePostDTO;

    if (!authorEmail) {
      return this.prisma.post.update({
        data: updatePostDTO,
        where: { id },
      });
    }

    delete updatePostDTO.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError('Author not found.');
    }

    const data: Prisma.PostUpdateInput = {
      ...updatePostDTO,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.update({
      where: { id: id },
      data: data,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
