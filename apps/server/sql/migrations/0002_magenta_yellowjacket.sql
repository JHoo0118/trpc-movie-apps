CREATE TABLE "movie_user_like" (
	"movie_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"is_like" boolean DEFAULT true NOT NULL,
	CONSTRAINT "movie_user_like_movie_id_user_id_pk" PRIMARY KEY("movie_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "movies_detail" (
	"id" serial PRIMARY KEY NOT NULL,
	"detail" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "directors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"dob" timestamp NOT NULL,
	"nationality" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_room_users" (
	"chat_room_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"message" varchar(1000) NOT NULL,
	"chat_room_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "movies" DROP CONSTRAINT "movies_director_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "detail_id" integer;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "like_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "dislike_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "movie_file_path" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "movie_user_like" ADD CONSTRAINT "movie_user_like_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_user_like" ADD CONSTRAINT "movie_user_like_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_room_users" ADD CONSTRAINT "chat_room_users_chat_room_id_chat_rooms_id_fk" FOREIGN KEY ("chat_room_id") REFERENCES "public"."chat_rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_room_users" ADD CONSTRAINT "chat_room_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_chat_room_id_chat_rooms_id_fk" FOREIGN KEY ("chat_room_id") REFERENCES "public"."chat_rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_detail_id_movies_detail_id_fk" FOREIGN KEY ("detail_id") REFERENCES "public"."movies_detail"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_director_id_directors_id_fk" FOREIGN KEY ("director_id") REFERENCES "public"."directors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "movies_detail_id_idx" ON "movies" USING btree ("detail_id");--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_detail_id_unique" UNIQUE("detail_id");