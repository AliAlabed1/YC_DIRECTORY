import { defineQuery } from "next-sanity";

export const STARTUP_QUIRY = defineQuery(`
    *[_type == 'startup' && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc){
        _id,
        title,
        slug,
        category,
        author -> {
        _id,
        name,
        image,
        bio
        },
        image,
        description,
        slug,
        views
    }     
`)

export const STARTUP_BY_ID_QUERY = defineQuery(`
    *[_type == 'startup' && _id == $id][0]{
        _id,
        title,
        slug,
        category,
        author -> {
            _id,
            name,
            image,
            bio,
            username
        },
        pitch,
        image,
        description,
        slug,
        views,
        _createdAt

    } 
`)

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == 'startup' && _id == $id][0]{
        _id,views
    }
`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == 'author' && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        bio,
        image
    }
`)

export const USER_BY_ID_QUERY = defineQuery(`
    *[_type == 'author' && _id == $id][0]{
        _id,
        id,
        name,
        image,
        username,
        email,
        bio
    }
`)

export const STARTUPs_BY_AUTHOR_QUIRY = defineQuery(`
    *[_type == 'startup' && author._ref == $id]| order(_createdAt desc){
        _id,
        title,
        slug,
        category,
        author -> {
        _id,
        name,
        image,
        bio
        },
        image,
        description,
        slug,
        views
    }     
`)

export const PLAYLIST_BY_SLUG_QUIRY = defineQuery(`
    *[_type=='playlist' && slug.current == $slug][0]{
        _id,
        title,
        slug,
        select[]=>{
            _id,
            _createdAt,
            title,
            slug,
            author->{
                _id,
                name,
                slug,
                image,
                bio
            },
            views,
            description,
            category,
            image,
            pitch
        }
    }
`)