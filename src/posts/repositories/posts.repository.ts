import { UpdatePostDto } from './../dto/update-post.dto';
import { CreatePostDto } from './../dto/create-post.dto';
import { PrismaService } from './../../prisma/prisma.service';
import { PostEntity } from '../entities/post.entity';

export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDTO: CreatePostDto): Promise<PostEntity> {
    return this.prisma.post.create({
      data: createPostDTO,
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
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: updatePostDTO,
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
